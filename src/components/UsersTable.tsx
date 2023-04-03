import { Box, Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { getUsers } from '../api';
import { TableHeader, ViewUserModal, RegisterUserModal } from './'
import { User } from '../interfaces';

export const UsersTable = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [limit, setLimit] = useState<number>(10);
    const [selectedUser, setSelectedUser] = useState<User | null>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  
    const onOpenModal = (user: User) => {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  
    const onCloseModal = () => {
      setSelectedUser(null);
      setIsModalOpen(false);
    }
  
    const onCreateUser = (newUser: User) => {
      const newUsersList = users;
      users.unshift(newUser);
      setUsers(newUsersList);
    }
  
    useEffect(() => {
      const loadUsers = async () => {
        const loadedUsers: User[] = await getUsers();
        setUsers(loadedUsers.slice(0, limit));
      }
      loadUsers();
  
      return
    }, [limit])
  return (
    <>
    <Box marginTop='50px' display='flex' justifyContent='space-between' width='80%'>
    <Button color='success' variant='contained' onClick={() => { setIsRegisterModalOpen(true) }}>
        Add user
      </Button>

      <Button variant='contained' onClick={() => { setLimit( limit + 1) }}>
        Load one more user
      </Button>

    </Box>

    <TableContainer sx={
      {
        maxHeight: '500px',
        width: '80%',
        margin: 'auto',
        marginTop: '50px'
      }
    }>
      <Table>
        <TableHeader objectSample={users[0]} />
        <TableBody>
          {
            users.map(
              (user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <Button
                      variant='contained'
                      onClick={() => { onOpenModal(user) }}
                    >
                      Info
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )
          }
        </TableBody>
      </Table>
    </TableContainer>

    <ViewUserModal
      isOpen={isModalOpen}
      onClose={onCloseModal}
      selectedUser={selectedUser}
    />

    <RegisterUserModal
      isOpen={isRegisterModalOpen}
      onClose={() => { setIsRegisterModalOpen(false) }}
      onSubmit={onCreateUser}
    />
    </>
  )
}
