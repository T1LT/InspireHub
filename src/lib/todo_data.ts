export const todo_data = [
  {
    todo_id: "1",
    title: "Complete React Project",
    body: "Finish the coding and testing for the React project.",
    due_date: 1702587840,
    completed: "in_progress",
    priority: "high",
    user_id: "5",
  },
  {
    todo_id: "2",
    title: "Chess Tournament Preparation",
    body: "Practice chess strategies for the upcoming tournament.",
    due_date: 1702587780,
    completed: "open",
    priority: "medium",
    user_id: "5",
  },
  {
    todo_id: "3",
    title: "Gym Workout",
    body: "Hit the gym for a strength training session.",
    due_date: 1702587720,
    completed: "completed",
    priority: "medium",
    user_id: "5",
  },
  {
    todo_id: "4",
    title: "Anime Marathon",
    body: "Watch the latest episodes of favorite anime series.",
    due_date: 1702587660,
    completed: "open",
    priority: "low",
    user_id: "5",
  },
  {
    todo_id: "5",
    title: "Photography Expedition",
    body: "Capture stunning photos during a photography trip.",
    due_date: 1702587600,
    completed: "open",
    priority: "low",
    user_id: "5",
  },
  {
    todo_id: "6",
    title: "Node.js Project Enhancement",
    body: "Improve features and performance of a Node.js project.",
    due_date: 1702587540,
    completed: "in_progress",
    priority: "medium",
    user_id: "5",
  },
  {
    todo_id: "7",
    title: "Game Night with Friends",
    body: "Plan and organize a gaming night with friends.",
    due_date: 1702587480,
    completed: "open",
    priority: "low",
    user_id: "5",
  },
  {
    todo_id: "8",
    title: "Redux State Management Tutorial",
    body: "Create a tutorial on effective Redux state management.",
    due_date: 1702587420,
    completed: "open",
    priority: "medium",
    user_id: "5",
  },
  {
    todo_id: "9",
    title: "Database Optimization for Rails App",
    body: "Optimize database queries for a Ruby on Rails application.",
    due_date: "2023-12-22T10:00:00",
    completed: 1702587360,
    priority: "medium",
    user_id: "5",
  },
  {
    todo_id: "10",
    title: "Study TypeScript Best Practices",
    body: "Read and implement best practices for TypeScript development.",
    due_date: 1702587300,
    completed: "open",
    priority: "low",
    user_id: "5",
  },
];

export type Todo = {
  todo_id: string;
  title: string;
  body: string;
  due_date: number;
  completed: "open" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  user_id: string;
};
