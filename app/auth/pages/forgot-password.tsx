import { BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ForgotPassword } from "app/auth/validations"
import forgotPassword from "app/auth/mutations/forgotPassword"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import { Box, TextField, Typography } from "@mui/material"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

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
      <LockOpenIcon
        sx={{
          fontSize: 100,
        }}
      />
      <Typography
        variant="h6"
        sx={{
          marginBottom: "1em",
        }}
      >
        Mot de passe oublié
      </Typography>

      {isSuccess ? (
        <div>
          <h2>Request Submitted</h2>
          <p>
            Si votre email est présent dans notre système, vous allez recevoir des instructions afin
            de changer votre mot de passe
          </p>
        </div>
      ) : (
        <Form
          submitText="Envoyer"
          schema={ForgotPassword}
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            try {
              await forgotPasswordMutation(values)
            } catch (error: any) {
              return {
                [FORM_ERROR]: "Une erreur inattendue s'est produite. Veuillez réessayer. - ",
              }
            }
          }}
        >
          <Box
            sx={{
              marginBottom: "1em",
            }}
          >
            <TextField name="email" label="Email" variant="standard" fullWidth />
          </Box>
        </Form>
      )}
    </Box>
  )
}

ForgotPasswordPage.redirectAuthenticatedTo = "/"
ForgotPasswordPage.getLayout = (page) => <Layout title="Mot de passe oublié ?">{page}</Layout>

export default ForgotPasswordPage
