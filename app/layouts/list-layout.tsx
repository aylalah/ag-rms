import { TableLayout, TableProps } from './_/tableLayout';

type ListProps = TableProps;

export const ListLayout = ({ ...props }: ListProps) => {
  console.log('ListLayout', props);

  return (
    <div className="h-[100%] flex flex-col overflow-hidden">
      <TableLayout {...props} />
    </div>
  );
};
