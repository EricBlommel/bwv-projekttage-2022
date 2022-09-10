import React, {useMemo, useRef, useState} from 'react';
import EventService from "../_shared/services/event.service";
import {EventResource} from "../_shared/types/event.type";
import {Avatar, Box, Card, CardActionArea, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import {Celebration} from "@mui/icons-material";
import {Navigate} from "react-router-dom";
import CreateEventButton from "../_shared/components/CreateEventButton";

const cardStyle = {
  minHeight: 250,
  maxHeight: 250
};

function Home() {

  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<EventResource[]>([]);
  const [redirectID, setRedirectID] = React.useState<string | undefined>(undefined);

  const updateRef = useRef(() => {
    setLoading(true);
    new EventService()
      .getAll()
      .then((response: EventResource[]) => {
        setEvents(response);
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false);
      })
  });

  //not in use
  const fetchData = useMemo(() => {
    updateRef.current();
    return true;
  }, [updateRef]);

  const handleClick = (id: string) => {
    setRedirectID(id);
  }

  return (
    <>
      <Box sx={{margin: 4}}>
        <Grid container spacing={2} justifyContent={"flex-start"}>
          {!loading && events.map((event: EventResource) =>
            <Grid item key={event.id!} xs={6} md={4}>
              <CardActionArea onClick={() => handleClick(event.id!)}>
                <Card sx={cardStyle}>
                  <CardHeader
                    avatar={
                      <Avatar>
                        <Celebration/>
                      </Avatar>
                    }
                    title={event.name}
                    subheader={event.beginsAt ? "" + new Date(event.beginsAt).toLocaleDateString() : ""}
                  />
                  <CardContent>
                    <Typography variant="body1" color="text.secondary">
                      {event.description}
                    </Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          )}
        </Grid>
        {redirectID && (<Navigate to={"/event/" + redirectID}/>)}
      </Box>
      <CreateEventButton/>
    </>
  )
}

export default Home;