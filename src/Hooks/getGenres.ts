type Filter={
  id: number;
  name: string;
}

export const getGenres = (selectedFilter: Filter[]) => {
  if (selectedFilter.length < 1) return "";
  const idArray = selectedFilter.map((item: any) => item.id).reduce((acc: any, id: any) => acc + "," + id);
  return idArray;
};
