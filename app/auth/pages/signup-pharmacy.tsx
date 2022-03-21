import { BlitzPage, Routes, useRouter } from "blitz"
import Layout from "../../core/layouts/Layout"
import { SignupPharmacyForm } from "../components/SignupPharmacyForm"

const SignupPharmacyPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <SignupPharmacyForm onSuccess={() => router.push(Routes.Home())} />
    </div>
  )
}

SignupPharmacyPage.redirectAuthenticatedTo = "/"
SignupPharmacyPage.getLayout = (page) => <Layout title="Créer un compte">{page}</Layout>

export default SignupPharmacyPage
