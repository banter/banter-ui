export default function topicUrlGenerator(topic, isSearchBar) {
  let name = '';
  if (!isSearchBar) {
    name = topic.value.replace(/\s+/g, '-').toLowerCase();
  } else {
    name = topic.label.replace(/\s+/g, '-').toLowerCase();
  }
  return `/topics/${name}/${topic.id}`;
}
