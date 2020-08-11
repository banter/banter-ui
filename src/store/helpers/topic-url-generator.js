export default function topicUrlGenerator(topic, isSearchBar) {
  const attr = isSearchBar ? 'label' : 'value';
  const name = topic[attr].replace(/\s+/g, '-').toLowerCase();
  return `/topics/${name}/${topic.id}`;
}
