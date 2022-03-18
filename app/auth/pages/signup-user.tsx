import { BlitzPage, Routes, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupUserForm } from "../components/SignupUserForm"

const SignupUserPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <SignupUserForm onSuccess={() => router.push(Routes.Home())} />
    </div>
  )
}

SignupUserPage.redirectAuthenticatedTo = "/"
SignupUserPage.getLayout = (page) => <Layout title="Créer un compte">{page}</Layout>

export default SignupUserPage
