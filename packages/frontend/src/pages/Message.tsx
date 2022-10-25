import { addContacts, userSearch } from "@/apis";
import Header from "@/components/Header";
import UserCard from "@/components/UserCard";
import { MailContext } from "@/hocMethods/withMail";
import { addContact } from "@/stores/main";
import type { Store } from "@/stores/types";
import type { UserInfo } from "@/stores/types/main";
import type { Message as MessageType } from "@/stores/types/message";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import React, { useCallback, useContext, useState } from "react";
import { usePopper } from "react-popper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Message.module.scss";

export default function Message() {
  // !这是一个键为对方用户ID的对象 (作用等同于Map)
  const messages = useSelector((store: Store) => store.message);
  const contacts = useSelector((store: Store) => store.main.contacts);
  const userInfo = useSelector((store: Store) => store.main.userInfo);
  const [referenceElement, setReferenceElement] =
    useState<SVGSVGElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: "arrow",
        options: { element: arrowElement },
      },
    ],
  });
  const [showSearch, setShowSearch] = useState(false);
  const { connected } = useContext(MailContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gotoChat = useCallback((userID: string) => {
    navigate(`/chat/${userID}`);
  }, []);

  return (
    <>
      <Header
        middle={
          <img
            alt="Bea"
            src={`bea${connected ? "" : "-down"}.svg`}
            className="h-12"
          />
        }
        right={
          <>
            <FontAwesomeIcon
              icon={faAdd}
              size="xl"
              ref={setReferenceElement}
              onClick={() => {
                setShowSearch(!showSearch);
              }}
            />
            <div
              ref={setPopperElement}
              style={{
                ...styles.popper,
                visibility: showSearch ? "inherit" : "hidden",
              }}
              className="bg-white"
              {...attributes.popper}
            >
              <UserSearch
                onClick={async (userInfo: UserInfo) => {
                  try {
                    await addContacts({ requestBody: userInfo });
                    dispatch(addContact(userInfo));
                  } finally {
                    gotoChat(userInfo.userID);
                  }
                }}
              />
              <div ref={setArrowElement} style={styles.arrow} />
            </div>
          </>
        }
      />
      {Object.entries(messages).map(([userID, messages]) => {
        if (contacts[userID] || userInfo?.userID === userID) {
          return (
            <MessageItem
              key={userID}
              userInfo={contacts[userID] || userInfo}
              messages={messages}
              onClick={gotoChat}
            />
          );
        }
      })}
    </>
  );
}

interface MessageItemProp {
  userInfo: UserInfo;
  messages: Array<MessageType>;
  onClick: (userID: string) => void;
}
interface timeType extends Dayjs {
  $H?: string;
  $m?: string;
}
const MessageItem = React.memo(
  ({ userInfo, messages, onClick: gotoChat }: MessageItemProp) => {
    const notReadiedMessages = messages.filter((message) => !message.readied);
    const time: timeType = dayjs(
      notReadiedMessages[notReadiedMessages.length - 1].dateTime
    );

    return (
      <div
        className={styles.messageItem}
        onClick={() => gotoChat(userInfo.userID)}
      >
        <div>
          <img
            className={styles.messageItemAvatar}
            src={userInfo.avatar}
            alt={userInfo.name}
          />
        </div>
        <div className={styles.messageItemRight}>
          <div className="userName">{userInfo.name}</div>
          <div className={styles.messageItemContent}>
            {notReadiedMessages[notReadiedMessages.length - 1].content}
          </div>
        </div>
        <div
          className="font-mono "
          style={{ fontSize: "13px", marginLeft: "30px", color: "#6b7280" }}
        >
          {time.$H + ":" + time.$m}
        </div>
      </div>
    );
  }
);

export interface UserSearchProps {
  onClick: (userInfo: UserInfo) => void;
}
const UserSearch = React.memo(({ onClick }: UserSearchProps) => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<Array<UserInfo>>([]);
  return (
    <div className="border-2 border-blue-300 rounded-md">
      <input
        value={username}
        className="border-b-2 border-blue-200"
        autoFocus={true}
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        className="border-[0.5px] border-blue-300 rounded-md"
        onClick={async () => {
          setUsers(await userSearch({ username }));
        }}
      >
        &emsp;搜索&emsp;
      </button>
      {users.map((user) => (
        <UserCard
          key={`ms-${user.userID}`}
          userID={user.userID}
          userInfo={user}
          onClick={onClick}
        />
      ))}
    </div>
  );
});
