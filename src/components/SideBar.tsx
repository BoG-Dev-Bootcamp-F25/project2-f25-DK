import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { MouseEventHandler, useState } from 'react';
const buttonClasses =
    'flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-150 ease-in-out hover:bg-gray-100 hover:text-blue-600';

interface SidebarItemProps {
    text: string;
    inactiveIconSrc: string; // Original, non-hovered icon
    activeIconSrc: string; // New icon for hover/active state
    url: string;
}

const SidebarItem = ({
    text,
    inactiveIconSrc,
    activeIconSrc,
    url,
}: SidebarItemProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const baseClasses =
        'flex items-left text-lg gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-150 ease-in-out';
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const hoverClasses = isHovered ? 'bg-red-600 text-white' : 'text-gray-700';
    const iconToUse = isHovered ? activeIconSrc : inactiveIconSrc;
    return (
        <Link
            className={`${baseClasses} ${hoverClasses}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            href={url}
        >
            <div className="flex-shrink-0 w-6 h-6">
                <Image
                    src={iconToUse}
                    width={24}
                    height={24}
                    alt={`${text} icon`}
                    className="object-contain"
                />
            </div>

            <span className="font-medium">{text}</span>
        </Link>
    );
};

const LogoutButton = () => {
    return (
        <div
            className={`cursor-pointer p-2 rounded-md transition-colors duration-150 hover:bg-gray-100`}
            onClick={() => signOut()}
        >
            <Image
                src={'/images/logoutLogo.png'}
                alt="Log Out"
                width={24}
                height={24}
            />
        </div>
    );
};

const SideBar = () => {
    const { data: session } = useSession();

    const handleClick = (item: string) => {
        console.log(`Navigating to: ${item}`);
    };

    const handleLogoutClick = () => {
        console.log('Logging out...');
        // Example: dispatch(logoutAction());
    };

    return (
        <div>
            <div className="p-4 h-full space-y-2">
                {/* --- Navigational Buttons --- */}

                <SidebarItem
                    text="Training Logs"
                    inactiveIconSrc="/images/inactiveTrainingLogs.png"
                    activeIconSrc="/images/activeTrainingLogo.png"
                    url="/dashboard/training-logs"
                />

                <SidebarItem
                    text="Animals"
                    inactiveIconSrc="/images/inactiveAnimalLogo.png"
                    activeIconSrc="/images/activeAnimalsLogo.png"
                    url="/dashboard/animals"
                />
                <hr className="p-2"></hr>
                <h1 className="font-bold pl-2 text-xl">Admin Access</h1>

                <SidebarItem
                    text="All Training"
                    inactiveIconSrc="/images/inactiveAllTrainingLogo.png"
                    activeIconSrc="/images/activeAllTrainingLogo.png"
                    url="/dashboard/admin/training-logs"
                />

                <SidebarItem
                    text="All Animals"
                    inactiveIconSrc="/images/inactiveAllAnimalsLogo.png"
                    activeIconSrc="/images/activeAllAnimalsLogo.png"
                    url="/dashboard/admin/animals"
                />

                <SidebarItem
                    text="All Users"
                    inactiveIconSrc="/images/inactiveAllUsersLogo.png"
                    activeIconSrc="/images/activeAllUsersLogo.png"
                    url="/dashboard/admin/users"
                />
                <hr></hr>
            </div>

            <div className="flex items-center gap-6">
                <div className="hover:bg-gray-100 flex gap-2 items-center ">
                    <div className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        {'L'}
                    </div>

                    <div className="flex flex-col">
                        <div className="text-lg font-semibold truncate">
                            {session?.user?.name}
                        </div>
                        {(session?.user as any)?.admin && (
                            <div className="text-sm text-gray-700 truncate">
                                Admin
                            </div>
                        )}
                    </div>
                </div>
                <LogoutButton />
            </div>
        </div>
    );
};

export default SideBar;