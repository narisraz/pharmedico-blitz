import { AuthenticationError, Link, PromiseReturnType, Routes, useMutation } from "blitz"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { Box, Button, TextField, Typography } from "@mui/material"
import LockOpenIcon from "@mui/icons-material/LockOpen"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

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
        LOGIN
      </Typography>

      <Form
        schema={Login}
        submitText={"Se connecter"}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const user = await loginMutation(values)
            props.onSuccess?.(user)
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Email ou mot de passe invalide" }
            } else {
              return {
                [FORM_ERROR]:
                  "Une erreur inattendue s'est produite. Veuillez réessayer. - " + error.toString(),
              }
            }
          }
        }}
      >
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
            textAlign: "right",
            marginBottom: "1em",
          }}
        >
          <Link href={Routes.ForgotPasswordPage()}>
            <a>Mot de passe oublié ?</a>
          </Link>
        </Box>
      </Form>

      <Box
        sx={{
          marginTop: "1em",
        }}
      >
        <Link href={Routes.SignupChooserPage()}>
          <Button type="submit" variant="outlined" fullWidth>
            Créer un compte
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default LoginForm
