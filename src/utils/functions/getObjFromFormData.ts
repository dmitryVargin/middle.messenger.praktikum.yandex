function getObjFromFormData(formData: FormData,): Record<string, string> {
  const formDataObj: Record<string, string> = {};
  formData.forEach((value, name,) => {
    formDataObj[name] = value as string
  })
  return formDataObj
}

export default getObjFromFormData
