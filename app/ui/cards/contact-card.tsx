type ContactCardProps = {
  contact: any;
  onEditForm: (args: any) => void;
  onDeleteForm: (args: any) => void;
};

const ContactCard = ({ contact, onEditForm, onDeleteForm }: ContactCardProps) => (
  <div key={contact.id} className="flex items-center justify-between py-4 border-b-[4px] border-[#0001]">
    <div className="flex flex-col w-full gap-1 text-[13px]">
      <p className="capitalize">
        <i className="mr-2 ri-user-line" />
        {contact.fullName}
      </p>

      <p>
        <i className="mr-2 ri-mail-line" />
        {contact.email}
      </p>

      <p>
        <i className="mr-2 ri-phone-line" />
        {contact.phoneNumbers}
      </p>

      <div className="flex items-center justify-start w-full gap-2 font-semibold cursor-pointer text-secondary">
        <p onClick={() => onEditForm(contact)} className="flex items-center gap-1 ">
          <i className="ri-edit-line" />
          Edit
        </p>

        <p onClick={() => onDeleteForm(contact?.id)} className="flex items-center gap-1">
          <i className="text-secondary ri-delete-bin-2-line" />
          Delete
        </p>
      </div>
    </div>
  </div>
);

export default ContactCard;
