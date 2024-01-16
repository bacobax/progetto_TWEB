import {FC, useState} from "react";
import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem, NavbarMenuToggle
} from "@nextui-org/react";
import {ROUTES} from "../../../constants/constants";
import {useAuth} from "../../../hooks/useAuth";
import {useLocation, Link, useNavigate} from "react-router-dom";
import SearchBar from "../searchbar/SearchBar";


const items = [
    {
        label: "Home",
        href: ROUTES.HOME
    },
    {
        label: "Games",
        href: ROUTES.GAMES
    },
    {
        label: "Gallery",
        href: ROUTES.CLUBS
    },
    {
        label: "Players",
        href: ROUTES.PLAYERS
    },
    {
        label: "Chat",
        href: ROUTES.CHAT
    },

]

export const GlobalNavbar:FC = () => {

    const {loggedIn, logout} = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    //get the current path
    const {pathname} = useLocation();
    console.log({pathname})

    console.log(`${pathname} === ${ROUTES.CHAT} = ${pathname === ROUTES.CHAT}`)


    return (
        <Navbar shouldHideOnScroll className={"dark top-0"} onMenuOpenChange={setIsMenuOpen} classNames={
            {
                menuItem: [
                    "flex",
                    "relative",
                    "h-full",
                    "items-center",
                    "data-[active=true]:after:content-['']",
                    "data-[active=true]:after:absolute",
                    "data-[active=true]:after:bottom-0",
                    "data-[active=true]:after:left-0",
                    "data-[active=true]:after:right-0",
                    "data-[active=true]:after:h-[2px]",
                    "data-[active=true]:after:rounded-[2px]",
                    "data-[active=true]:after:bg-secondary",
                ],

            }
        }>
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden text-white"
            />
            <NavbarBrand>

                <SearchBar />
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {
                    items.map((el,idx) => (
                        <NavbarMenuItem isActive={pathname === el.href} key={idx}>
                            <Link className={"text-white"} to={el.href}>
                                {el.label}
                            </Link>
                        </NavbarMenuItem>
                    ))
                }
            </NavbarContent>
            <NavbarContent justify="end">
                {
                    !loggedIn ? <>
                    <NavbarItem className="hidden lg:flex">
                        <Link className={"text-white"} to={ROUTES.AUTH}>Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button color="primary" variant="flat" onClick={()=>{
                            navigate("/auth");
                        }}>
                            Sign Up
                        </Button>
                    </NavbarItem></> : <NavbarItem>
                        <Button onClick={logout} color={"danger"} variant={"flat"}>
                            Logout
                        </Button>
                    </NavbarItem>
                }
            </NavbarContent>
            <NavbarMenu className={"dark flex flex-col items-center justify-center gap-5"}>
                {items.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`} isActive={item.href === pathname}>
                        <Link
                            className="w-full text-2xl text-white"
                            to={item.href}
                            key={index}
                            color={"foreground"}
                        >
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};