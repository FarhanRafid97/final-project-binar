import {
  Avatar,
  Box,
  Button,
  Center,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Img,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Popover,
  PopoverContent,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu as HamburgerIcon } from 'react-icons/gi';
import {
  MdClose as CloseIcon,
  MdKeyboardArrowDown as ChevronDownIcon,
  MdKeyboardArrowRight as ChevronRightIcon,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { API_AUTH } from '../axios/api';
import { authSelector, setUserData } from '../store/slices/auth';
import FavoriteDrawer from './FavoriteDrawer';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);

  const [scrollState, setScrollState] = useState(true);

  useEffect(() => {
    let ignore = false;
    const getUser = async () => {
      if (user) {
        return;
      }
      if (session) {
        const { data } = await API_AUTH(session?.user?.accessToken).get(
          '/user/myBio'
        );
        if (ignore) {
          return;
        }
        dispatch(setUserData(data));
      }
      return;
    };
    getUser();
    return () => (ignore = true);
  }, [dispatch, session, user]);

  useEffect(() => {
    const scroll = window.addEventListener('scroll', () => {
      if (window.scrollY >= 120) {
        if (scrollState) setScrollState(false);
      } else {
        setScrollState(true);
      }
    });

    return () => {
      window.removeEventListener('scroll', scroll);
    };
  }, [scrollState]);

  const color = useColorModeValue('white', 'gray.800');

  const jsx_sideNav = () => {
    if (!user) {
      return (
        <>
          <Link
            p={2}
            fontSize={'sm'}
            fontWeight={500}
            color="gray.500"
            _hover={{
              textDecoration: 'none',
              color: 'gray',
            }}
            onClick={() => signIn()}
          >
            Login
          </Link>

          <NextLink href="/register" passHref>
            <Link
              p={2}
              fontSize={'sm'}
              fontWeight={500}
              color="whitgray.500e"
              _hover={{
                textDecoration: 'none',
                color: 'gray',
              }}
            >
              Register
            </Link>
          </NextLink>
        </>
      );
    }
    return (
      <Flex alignItems="center">
        <FavoriteDrawer scrollState={scrollState} />
        <Menu>
          <MenuButton
            as={Button}
            rounded="full"
            variant="link"
            cursor="pointer"
          >
            <Avatar
              size="sm"
              src={
                user && user?.biodata?.profilePict
                  ? user?.biodata?.profilePict
                  : 'https://avatars.dicebear.com/api/male/username.svg'
              }
            />
          </MenuButton>
          <MenuList alignItems="center">
            <br />
            <Center>
              <Avatar
                size={'2xl'}
                src={
                  user && user?.biodata?.profilePict
                    ? user?.biodata?.profilePict
                    : 'https://avatars.dicebear.com/api/male/username.svg'
                }
              />
            </Center>

            <Center>{user?.username}</Center>

            <MenuDivider />
            <MenuItem>
              <NextLink href={`/profile/${user?.username}`}>
                <Link
                  fontSize={'sm'}
                  color="black"
                  _hover={{
                    textDecoration: 'none',
                    color: 'gray',
                  }}
                >
                  Profile
                </Link>
              </NextLink>
            </MenuItem>
            <MenuItem>
              <NextLink href={`/profile/edit`}>
                <Link
                  fontSize={'sm'}
                  color="black"
                  _hover={{
                    textDecoration: 'none',
                    color: 'gray',
                  }}
                >
                  Edit Profile
                </Link>
              </NextLink>
            </MenuItem>
            <MenuItem>
              <NextLink href="/dashboard">
                <Link
                  fontSize={'sm'}
                  color="black"
                  _hover={{
                    textDecoration: 'none',
                    color: 'gray',
                  }}
                >
                  Dashboard
                </Link>
              </NextLink>
            </MenuItem>

            <MenuItem onClick={() => signOut()}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    );
  };

  return (
    <Box
      minWidth="100%"
      position="fixed"
      px={4}
      zIndex={99}
      bgColor={!scrollState ? color : ''}
    >
      <Flex
        pos="static"
        color={useColorModeValue('gray.600', 'white')}
        minWidth="100%"
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'hidden'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <NextLink href={'/'}>
            <Link>
              <Img boxSize="30px" src="/assets/img-logo.png" />
            </Link>
          </NextLink>

          <Flex
            display={{ base: 'none', md: 'flex' }}
            ml={['', '100px', '200px', '336px']}
          >
            <DesktopNav />
          </Flex>
        </Flex>

        <Flex alignItems="center">
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
          >
            {jsx_sideNav()}
          </Stack>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.500', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.500', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={[' ', '10px', '55px', '88px']}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <NextLink href={navItem.to}>
              <Link
                p={2}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </NextLink>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <NextLink href={href}>
      <Link
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
      >
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{ color: 'pink.400' }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}
          >
            <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    </NextLink>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} to={navItem.to} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, to, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <NextLink href={to}>
          <Link
            p={2}
            fontSize={'sm'}
            fontWeight={500}
            color="gray.500"
            _hover={{
              textDecoration: 'none',
              color: 'gray.700',
            }}
          >
            {label}
          </Link>
        </NextLink>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Leaderboard',
    to: '/leaderboard',
  },
  {
    label: 'Games',
    to: '/game',
  },
];
