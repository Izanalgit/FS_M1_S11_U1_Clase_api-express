const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(express.json()) // Parsear el body en json para disponerlo en req.body

const taskList = {}

app.get('/tasks', (req, res) => {
	res.json(Object.values(taskList))
})

app.get('/tasks/:taskId', (req, res) => {
	const { taskId } = req.params

	if (!taskList[taskId])
		return res.status(404).json({ message: 'Item not found' })

	res.json(taskList[taskId])
})

app.post('/tasks', (req, res) => {
	const id = uuidv4()
	const newTask = { id, ...req.body }

	taskList[id] = newTask

	res.status(201).send(newTask)
})

app.put('/tasks/:taskId', (req, res) => {
	const { taskId } = req.params

	if (!taskList[taskId])
		return res.status(404).json({ message: 'Item not found' })

	taskList[taskId] = { ...taskList[taskId], ...req.body }

	res.json(taskList[taskId])
})

app.delete('/tasks/:taskId', (req, res) => {
	const { taskId } = req.params

	if (!taskList[taskId])
		return res.status(404).json({ message: 'Item not found' })

	const deletedTask = taskList[taskId]

	delete taskList[taskId]

	res.json(deletedTask)
})

app.get('/ping', (req, res) => {
	res.json({ message: 'pong' })
})

app.listen(3000, () => console.log('Server on...'))
