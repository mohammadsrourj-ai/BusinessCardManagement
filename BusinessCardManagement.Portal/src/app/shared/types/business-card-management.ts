export type GetAllBusinessCardRequest = {
  Name: string | null,
  Gender: string | null,
  DateOfBirth: string | null,
  Email: string | null,
  Phone: string | null
};

export type BusinessCardForm = {
  Name: string,
  Gender: string,
  DateOfBirth: string,
  Email: string;
  Phone: string;
  Photo: string | null;
  Address: string;
};
export enum FileType {
  Csv = 'Csv',
  Xml = 'Xml'
}

