const apiKeyInput=document.getElementById('apiKey')
const gameSelct=document.getElementById('gameSelect')
const questionInput=document.getElementById('questionImput')
const askButton=document.getElementById('askButton')
const form=document.getElementById('form')
const aiResponse=document.getElementById('aiResponse')

const enviarFormulario =(event)=>{
  event.preventDefault()
  console.log(event)
}
form.addEventListener('submit',enviarFormulario)