declare namespace LeetCode {
  type itemPayload = {
    title: string;
    detail: {
      description?: string;
      tags?: string[];
      difficulty?: 'Easy' | 'Medium' | 'Hard';
      url_sources: string[]
    };
  };

  type questionItem = {
    id: string;
    item_title: string;
    detail: {
      description: string;
      tags: string[];
      difficulty: 'Easy' | 'Medium' | 'Hard';
      url_sources: string[]
    };
    time_created: string;
    last_visited: string;
  };

}
