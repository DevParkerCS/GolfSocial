export type PublicUserType = {
  _id: string;
  username: string;
  followers: string[];
  following: string[];
  numFollowers: number;
  numFollowing: number;
  totalScoreSum: number;
  totalPlays: number;
  lowScore: number;
  highScore: number;
  mostPlayed: {
    courseName: string;
    courseId: string;
  };
  lowRound: {
    courseName: string;
    courseId: string;
  };
  highRound: {
    courseName: string;
    courseId: string;
  };
};
