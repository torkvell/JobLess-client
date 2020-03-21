export type Navigation = {
  route: { key: String; name: String; params: { jobless: Boolean } };
  navigate: (screne: string, data?: any) => void;
  state: { params: { jobless: Boolean } };
};

export type Route = {
  key: String;
  name: String;
  params: { jobless: Boolean };
};
