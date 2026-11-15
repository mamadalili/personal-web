import {workStoryTopics} from '../public/work-stories-data.mjs';
import {workStoryHref} from '../public/work-stories-model.mjs';

export function publishedStories(posts) {
  const linked = Object.values(workStoryTopics).flat().filter(story => workStoryHref(story,'fa',posts));
  return [...new Set(linked.map(story => story.post))].map(slug => ({slug,status:'published'}));
}
