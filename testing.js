function getInitial(name) {
  const splittedName = name.split(" ");
  return `${splittedName[0].charAt(0)}${splittedName[1].charAt(0)}`;
}getInitial("Yusuff Olatunji")