import * as React from 'react';
import IconButton from "@mui/material/IconButton";
import {AccountCircle, Logout} from "@mui/icons-material";
import {Button, Divider, ListItemIcon, MenuItem, Menu, ListItem, ListItemAvatar, ListItemText, Avatar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {User} from "../../types/user.type";
import AuthService from "../../services/auth.service";

interface Props {
}

function UserButton(props: Props) {

  const user: User = AuthService.getCurrentUser();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/signin`;
    navigate(path);
  }

  return (
    <>
      {!user && <Button color="inherit" onClick={routeChange}>Anmelden</Button>}
      {user &&
          <>
              <IconButton onClick={handleClick} color="inherit" size="large">
                  <AccountCircle/>
              </IconButton>

              <Menu

                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{horizontal: 'right', vertical: 'top'}}
                  anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              >
                  <ListItem dense>
                      <ListItemAvatar>
                          <Avatar/>
                      </ListItemAvatar>
                      <ListItemText primary={user.username} secondary={user.email}/>
                  </ListItem>
                  <Divider/>
                  <MenuItem onClick={() => AuthService.logout()}>
                      <ListItemIcon>
                          <Logout fontSize="small"/>
                      </ListItemIcon>
                      Logout
                  </MenuItem>
              </Menu>
          </>
      }


    </>
  );
}

export default UserButton;