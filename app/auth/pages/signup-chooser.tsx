import { Link, Routes } from "blitz"
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy"
import ScienceIcon from "@mui/icons-material/Science"
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"
import Layout from "../../core/layouts/Layout"

export const SignupChooserPage = () => {
  return (
    <Box
      sx={{
        padding: "1em",
        maxWidth: "325px",
        textAlign: "center",
        alignItems: "center",
        margin: "auto",
        marginTop: "25px",
      }}
    >
      <LockOpenIcon
        sx={{
          fontSize: 100,
        }}
      />
      <Typography variant="h6">S&apos;inscrire En tant que</Typography>

      <List
        sx={{
          paddingTop: "2em",
        }}
      >
        <Link href={Routes.SignupUserPage()}>
          <ListItemButton>
            <ListItemIcon>
              <PersonOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Visiteur" />
          </ListItemButton>
        </Link>
        <Link href={Routes.SignupDoctorPage()}>
          <ListItemButton>
            <ListItemIcon>
              <LocalHospitalIcon />
            </ListItemIcon>
            <ListItemText primary="Médecin" />
          </ListItemButton>
        </Link>
        <Link href={Routes.SignupPharmacyPage()}>
          <ListItemButton>
            <ListItemIcon>
              <LocalPharmacyIcon />
            </ListItemIcon>
            <ListItemText primary="Pharmacie" />
          </ListItemButton>
        </Link>
        <ListItemButton>
          <ListItemIcon>
            <ScienceIcon />
          </ListItemIcon>
          <ListItemText primary="Laboratoire" />
        </ListItemButton>
      </List>
    </Box>
  )
}

SignupChooserPage.redirectAuthenticatedTo = "/"
SignupChooserPage.getLayout = (page) => <Layout>{page}</Layout>

export default SignupChooserPage
