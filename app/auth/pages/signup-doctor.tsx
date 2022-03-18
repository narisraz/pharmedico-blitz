import { BlitzPage, Routes, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupDoctorForm } from "../components/SignupDoctorForm"

const SignupDoctorPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <SignupDoctorForm onSuccess={() => router.push(Routes.Home())} />
    </div>
  )
}

SignupDoctorPage.redirectAuthenticatedTo = "/"
SignupDoctorPage.getLayout = (page) => <Layout title="Créer un compte">{page}</Layout>

export default SignupDoctorPage
