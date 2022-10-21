import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message extends BaseEntity {
  /*
   * 消息ID
   */
  @PrimaryGeneratedColumn()
  msgID: string;
  /**
   * 消息内容
   */
  @Column()
  content: string;
  /**
   * 发送时间
   */
  @Column()
  dateTime: string;
  /**
   * 消息类型
   */
  @Column()
  msgType: number;
  /**
   * 已读状态
   */
  @Column()
  readied: boolean;
}

export type MessageType = Omit<Message, keyof BaseEntity>;
