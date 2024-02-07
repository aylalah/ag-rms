import { TableLayout, TableProps } from './_/tableLayout';

type ListProps = TableProps;

export const ListLayout = ({ ...props }: ListProps) => {
  return (
    <div className="h-[100%] flex flex-col overflow-hidden">
      <TableLayout {...props} />
    </div>
  );
};
