declare namespace LeetCode {
  type questionPayload = {
    title: string;
    detail: {
      description?: string;
      tags?: string[];
      difficulty?: 'Easy' | 'Medium' | 'Hard';
    };
  };

  type question = {
    id: string;
    item_title: string;
    detail: {
      description: string;
      tags: string[];
      difficulty: 'Easy' | 'Medium' | 'Hard';
    };
    time_created: string;
    last_visited: string;
  };
}
