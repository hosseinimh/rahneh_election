import { FormCard, FormPageLayout } from "../";

const FormPage = ({
    children,
    pageUtils,
    modals = null,
    submitEnabled = true,
}) => {
    return (
        <FormPageLayout pageUtils={pageUtils} modals={modals}>
            <FormCard pageUtils={pageUtils} submitEnabled={submitEnabled}>
                {children}
            </FormCard>
        </FormPageLayout>
    );
};

export default FormPage;
