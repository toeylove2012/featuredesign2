export function convertDatasets(data: any, topic: string, isValue: boolean) {
  const results = [];
  if (isValue) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].key.startsWith(topic)) {
        results.push(data[i].value);
      }
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].topic.startsWith(topic)) {
        results.push(data[i].dataSet);
      }
    }
  }
  return isValue ? results[0] : results;
}
export function ModifyMenu(_array: any[]) {
  if (!Array.isArray(_array) || !_array) return [];
  return (
    Array.isArray(_array) &&
    _array.reduce((acc, cur) => {
      const indexEl = _array.findIndex(el => el.nameEng.indexOf('lottery') && cur.nameEng.indexOf('lottery'));
      if (indexEl !== -1) {
        return [...acc, { ...cur }];
      } else {
        return [...acc, { ...cur, sub: [] }];
      }
    }, [])
  );
}
export function convertDatasetsLists(data: any[], topic: string) {
  const results: any[] = [];
  data.forEach(el => {
    const indexEl = topic.indexOf(el.key);
    if (indexEl !== -1) {
      return results.push(el.value);
    }
  }, []);

  return results;
}
