import { Form } from "app/core/components/Form"
import { useMutation } from "blitz"
import { Login } from "../validations"
import { FORM_ERROR } from "../../core/components/Form"
import { Box, Button, TextField, Typography } from "@mui/material"
import FileUploadIcon from "@mui/icons-material/FileUpload"
import { useEffect, useState } from "react"
import signupDoctor from "../mutations/signupDoctor"
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"

export { FORM_ERROR } from "app/core/components/Form"

type SignupDoctorFormProps = {
  onSuccess?: () => void
}

export function SignupDoctorForm(props: SignupDoctorFormProps) {
  const [signupMutation] = useMutation(signupDoctor)
  const [fileList, setFileList] = useState<FileList | null>()
  const [profilePhoto, setProfilePhoto] = useState<File | null>()

  useEffect(() => {
    if (fileList && fileList.length) {
      const file = fileList.item(0)
      setProfilePhoto(file)
    }
  }, [fileList])

  return (
    <Box
      sx={{
        padding: "1em",
        maxWidth: "400px",
        textAlign: "center",
        alignItems: "center",
        margin: "auto",
        marginTop: "25px",
      }}
    >
      {profilePhoto ? (
        <img src={`${URL.createObjectURL(profilePhoto)}`} />
      ) : (
        <LocalHospitalIcon
          sx={{
            fontSize: 100,
          }}
        />
      )}
      <Typography
        variant="h6"
        sx={{
          marginBottom: "1em",
        }}
      >
        Médecin
      </Typography>
      <Form
        schema={Login}
        submitText={"Créer compte"}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <Box>
          <div>
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="profile-photo"
                type="file"
                accept="image/*"
                onChange={({ target }) => setFileList(target.files)}
              />

              <Button
                color="secondary"
                variant="contained"
                component="span"
                startIcon={<FileUploadIcon />}
              >
                {profilePhoto?.name ?? "Photo de profile"}
              </Button>
            </label>
          </div>
          <div>
            <TextField name="name" label="Nom" variant="standard" margin="dense" fullWidth />
          </div>
          <div>
            <TextField
              name="firstName"
              label="Prénom"
              variant="standard"
              margin="dense"
              fullWidth
            />
          </div>
          <div>
            <TextField name="onm" label="ONM" variant="standard" margin="dense" fullWidth />
          </div>
          <div>
            <TextField name="address" label="Adresse" variant="standard" margin="dense" fullWidth />
          </div>
          <div>
            <TextField
              name="homeTel"
              label="Tel. domicile"
              variant="standard"
              margin="dense"
              fullWidth
            />
          </div>
          <div>
            <TextField
              name="proTel"
              label="Tel. professionnel"
              variant="standard"
              margin="dense"
              fullWidth
            />
          </div>
          <div>
            <TextField
              name="officeTel"
              label="Tel. bureau"
              variant="standard"
              margin="dense"
              fullWidth
            />
          </div>
          <div>
            <TextField name="email" label="Email" variant="standard" margin="dense" fullWidth />
          </div>
          <div>
            <TextField
              name="password"
              label="Mot de passe"
              variant="standard"
              type="password"
              margin="dense"
              fullWidth
            />
          </div>
          <Box
            sx={{
              marginBottom: "1em",
            }}
          >
            <TextField
              name="confirmPassword"
              label="Confirmation du mot de passe"
              variant="standard"
              type="password"
              fullWidth
            />
          </Box>
        </Box>
      </Form>
    </Box>
  )
}
