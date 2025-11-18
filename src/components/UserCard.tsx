
type UserCardProps = {
    email: string;
    fullName: string;
    admin: boolean;
}


const UserCard = (props: UserCardProps) => {

    const {fullName, admin} = props;

    return <div className='w-80 h-36 p-8 shadow-md rounded-2xl flex gap-2 flex-row items-center'>
        <div className='rounded-full bg-red-700 w-16 h-16 text-center flex items-center justify-center'><p className='text-center text-neutral-50 text-2xl'>{fullName.charAt(0)}</p></div>
        <div className='flex flex-col  text-neutral-800'><h1>{fullName}</h1><p className="text-neutral-400">{admin ? 'Admin' : ''} - Atlanta, Georgia</p></div>
    </div>;
}
 
export default UserCard;