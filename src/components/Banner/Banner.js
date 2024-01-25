import { Container, makeStyles, Typography } from "@material-ui/core";
import Carousel from "./Carousel";



//using useStyles to import image for banner
//we will use coin gecko api for trending coins and info regarding coins.
//we will use single coin api,coin list api,historical chart api and api to list all trending coins.

const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: "url(./banner2.jpg)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
}));

function Banner() {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Coin VISTA
          </Typography>
          <Typography variant="subtitle1"
        style={{
          fontWeight:"bold",
          color:"gold",
          textTransform:"capitalize",
          fontFamily:"Montserrat"
        }}>
        Decoding Dreams, Encoding Coins: Your Cryptic Journey Starts Here!
        </Typography>
        <Typography variant="subtitle2"
        style={{
          
          color:"white",
          textTransform:"capitalize",
          fontFamily:"cursive"
        }}>
        Get all the INFO regarding your favourite Crypto Coins here.
        </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
