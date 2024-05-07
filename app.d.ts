type Slug =
  | 'departments'
  | 'methodologies'
  | 'questionnaires'
  | 'industries'
  | 'ratings'
  | 'ratingTypes'
  | 'clients'
  | 'contacts';

type User = {
  id: string;
  role: string;
  firstname: string;
  lastname: string;
  corporateEmail: string;
  departmentRole: string;
  image: string;
  levelModel: {
    name: string;
  };
  unitModel: { name: string };
};

type LogDBActionProps = {
  table: string;
  user: string;
  action: 'login' | 'create' | 'update' | 'delete';
  prevDocs: string;
  newDocs: string;
};

type FileProp = {
  id: string;
  name: string;
  size: number;
  status: boolean;
  shouldAllow: boolean;
  url: string;
  date: Date;
};
