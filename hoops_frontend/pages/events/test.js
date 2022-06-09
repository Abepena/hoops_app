import { useRef, useState } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { Formik, Field, Form } from "formik";

function create() {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const [place, setPlace] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places", "directions"],
  });
  const onPlaceChanged = () => {
    console.log(place.getPlace());
    const {
      formatted_address,
      geometry: {
        location: { lat, lng },
      },
    } = place.getPlace();
    console.log(formatted_address);
    console.log(lat());
    console.log(lng());
  };

  return (
    <div className="create-location">
      <h1>Create Location</h1>
      {isLoaded ? (
        <div className="create">
          <Formik
            initialValues={{
              address: "",
            }}
            onSubmit={async (values) => {
              await sleep(500);
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ isSubmitting }) => (
<Formik enableReinitialize={true} initialValues={{ companyAddress: '', zipCode: '', city: '', stateOfAddress: '', submit: null }} validationSchema={Yup.object().shape({ companyAddress: Yup.string().max(255).required('Company address is required'), zipCode: Yup.string().max(255), city: Yup.string().max(255), stateOfAddress: Yup.string().max(255), })} onSubmit={async (values, { setErrors, setStatus, setSubmitting, }) => { try { console.log(values); } catch (err) { console.error(err); setStatus({ success: false }); setErrors({ submit: err.message }); setSubmitting(false); } }} > 
{({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => ( 
<form onSubmit={handleSubmit} {...rest} > 
<Grid container> 
<Grid item md={6} xs={12}> 
<Box mt={3} px={6}> 
<Grid container spacing={3}> 
<Grid item xs={12}> 
<Autocomplete options={addresses.map((option) => option.description)} 
 onInputChange={(event, value) => { changeAddress(value, setFieldValue); }}
autoComplete={false} 
renderInput={(params) => ( <TextField {...params} label="Company Address" name="companyAddress" value={values.companyAddress} onChange={(value) => { handleChangeAddress(value); }} variant="outlined" /> )} /> </Grid> <Grid item xs={12}> <TextField error={Boolean(touched.zipCode && errors.zipCode)} fullWidth helperText={touched.zipCode && errors.zipCode} label="Zip Code" name="zipCode" onBlur={handleBlur} onChange={handleChange} value={values.zipCode} variant="outlined" /> </Grid> <Grid item xs={12}> <TextField error={Boolean(touched.city && errors.city)} fullWidth helperText={touched.city && errors.city} label="City" name="city" onBlur={handleBlur} onChange={handleChange} value={values.city} variant="outlined" /> </Grid> <Grid item xs={12}> <TextField error={Boolean(touched.stateOfAddress && errors.stateOfAddress)} fullWidth helperText={touched.stateOfAddress && errors.stateOfAddress} label="State (Administrative Area)" name="stateOfAddress" onBlur={handleBlur} onChange={handleChange} value={values.stateOfAddress} variant="outlined" /> </Grid> </Grid> {Boolean(touched.tags && errors.tags) && ( <Box mt={2}> <FormHelperText error> {errors.tags} </FormHelperText> </Box> )} {Boolean(touched.startDate && errors.startDate) && ( <Box mt={2}> <FormHelperText error> {errors.startDate} </FormHelperText> </Box> )} {Boolean(touched.endDate && errors.endDate) && ( <Box mt={2}> <FormHelperText error> {errors.endDate} </FormHelperText> </Box> )} </Box> <Box mt={12} display="flex" > <Box flexGrow={1} /> <Button color="secondary" disabled type="submit" variant="contained" size="large" > Submit </Button> </Box> </Grid> </Grid> </form> )} </Formik>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default create;
