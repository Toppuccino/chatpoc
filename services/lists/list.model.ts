export interface IMessage {
  mBy: string;
  mTo: string;
  messageId: string;
  content: string;
  timestamp: string;
}

export interface IData {
  user: {
    userId: string;
    gender: string;
    name: {
      title: string;
      first: string;
      last: string;
    };
    topMessage: string;
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
    nat: string;
  };
  message: IMessage[];

  // export interface IData {
  //   user: {
  //     userId: string;
  //     gender: string;
  //     name: {
  //       title: string;
  //       first: string;
  //       last: string;
  //     };
  //     email: string;
  //     phone: string;
  //     birthdate: string;
  //     timezone: string;
  //     status: string;
  //     picture: {
  //       thumbnail: string;
  //       small: string;
  //       medium: string;
  //       large: string;
  //     };
  //     nat: string;
  //   };
  //   message: {
  //     mBy: string;
  //     mTo: string;
  //     messageId: string;
  //     content: string;
  //     timestamp: string;
  //     status: 'sent' | 'delivered' | 'read'; // Example for message status
  //     type: 'text' | 'image' | 'file'; // Example for message type
  //     reactions?: {
  //       emoji: string;
  //       count: number;
  //     }[];
  //     attachments?: {
  //       type: 'image' | 'file';
  //       url: string;
  //     }[];
  //     editedAt?: string;
  //     deletedAt?: string;
  //     threadId?: string;
  //     conversationId?: string;
  //   }[];
  // }
}
