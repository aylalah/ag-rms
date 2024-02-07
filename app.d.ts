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
  firstName: string;
  lastName: string;
  corporateEmail: string;
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
