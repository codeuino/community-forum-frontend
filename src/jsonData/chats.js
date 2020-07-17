const DiscussionInfo = {
  Discussion: [
    {
      _ID: "random123",
      TopicName: "Adding a feature in SpansBerry",
      Tags: ["NodeJS", "ReactJS"],
      TopicDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      chats: [
        {
          _ID: "chat1",
          replyTo: "",
          avatarurl: "",
          username: "Devansh Agarwal",
          userID: "devansh",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
          likes: "10",
          comments: "0",
        },
        {
          replyTo: "",
          _ID: "chat2",
          avatarurl: "",
          username: "Devansh Agarwal",
          userID: "devansh",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
          likes: "10",
          comments: "0",
        },
        {
          replyTo: "",
          _ID: "chat3",
          avatarurl: "",
          username: "Devansh Agarwal",
          userID: "devansh",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
          likes: "10",
          comments: "0",
        },
        {
          replyTo: "chat1",
          _ID: "chat4",
          avatarurl: "",
          username: "Jaskirat Singh",
          userID: "jaskirat",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
          likes: "10",
          comments: "0",
        },
        {
          replyTo: "chat3",
          _ID: "chat5",
          avatarurl: "",
          username: "Devesh Verma",
          userID: "devesh",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
          likes: "0",
          comments: "0",
        },
        {
          replyTo: "chat3",
          _ID: "chat6",
          avatarurl: "",
          username: "Devesh Verma",
          userID: "devesh",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
          likes: "0",
          comments: "0",
        },
        {
          replyTo: "",
          _ID: "chat7",
          avatarurl: "",
          username: "Devesh Verma",
          userID: "devesh",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
          likes: "0",
          comments: "0",
        },
      ],
    },
    {
      _ID: "random1234",
      TopicName: "Adding a feature in SpansBerry but really not!",
      Tags: ["NodeJS", "ReactJS"],
      TopicDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      chats: [
        {
          avatarurl: "",
          username: "Devansh Agarwal",
          userID: "devansh",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
          likes: "10",
          comments: "0",
        },
        {
          avatarurl: "",
          username: "Devansh Agarwal",
          userID: "devansh",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
          likes: "10",
          comments: "0",
        },
        {
          avatarurl: "",
          username: "Devansh Agarwal",
          userID: "devansh",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
          likes: "10",
          comments: "0",
        },
        {
          avatarurl: "",
          username: "Jaskirat Singh",
          userID: "jaskirat",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
          likes: "10",
          comments: "0",
        },
        {
          avatarurl: "",
          username: "Devesh",
          userID: "devesh",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
          likes: "0",
          comments: "0",
        },
        {
          avatarurl: "",
          username: "Devesh",
          userID: "devesh",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
          likes: "0",
          comments: "0",
        },
        {
          avatarurl: "",
          username: "Devesh",
          userID: "devesh",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
          likes: "0",
          comments: "0",
        },
      ],
    },
  ],
};

let UserEngaged = [
  ...new Set(
    DiscussionInfo.Discussion[0].chats.map((chat) => {
      return chat.username;
    })
  ),
];

const UserInfo = {
  UserEngaged,
};

export { DiscussionInfo, UserInfo };
