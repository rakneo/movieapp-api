// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const controllers = require('../controllers')

router.get('/getmovie/:id', (req, res)=>{
	const controller = controllers.movie
	const id = req.params.id

	if(controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid Resource'
		})

		return
	}

	controller.getMovie(id)
	.then(data => {
			res.json({
				confirmation:'success',
				data:data.imdb_id
			})
		})
	.catch(err => {
		res.json({
			confirmation:'fail',
			message:err.message
		})
	})
})

router.get('/movie/:type', (req, res) =>{
	const controller = controllers.movie
	const type = req.params.type

	if(controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid Resource'
		})

		return
	}else if(type == "now_playing"){
		controller.getNowPlaying()
		.then(data => {
			res.json({
				confirmation:"success",
				size:data["results"].length,
				data:data["results"]
			})
		})
		.catch(err=>{
			res.json({
				confirmation:'fail',
				message:err.message
			})
		})
	}else if(type == "popular"){
		controller.getPopular()
		.then(data => {
			res.json({
				confirmation:"success",
				size:data["results"].length,
				data:data["results"]
			})
		})
		.catch(err=>{
			res.json({
				confirmation:'fail',
				message:err.message
			})
		})
	}else if(type == "top_rated"){
		controller.getTopRated()
		.then(data => {
			res.json({
				confirmation:"success",
				size:data["results"].length,
				data:data["results"]
			})
		})
		.catch(err=>{
			res.json({
				confirmation:'fail',
				message:err.message
			})
		})
	}else if(type == "trending"){
		controller.getTrending()
			.then(data => {
				res.json({
					confirmation:'success',
					size:data["results"].length,
					data:data["results"]
				})
			})
			.catch(err => {
				res.json({
					confirmation:'fail',
					message:err.message
				})
			})
		
	}
})

router.get('/user/:id',(req, res)=>{
	const controller = controllers.user
	const id = req.params.id

	if(controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid Resource'
		})

		return
	}

	controller.getUser(id)
	.then(data =>{
		res.json({
			confirmation:'success',
			data:data
		})
	})
	.catch(err =>{
		res.json({
			confirmation:'fail',
			message:err.message
		})
	})

})



router.post('/user/create',(req, res)=>{
	const controller = controllers.user

	if(controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid Resource'
		})

		return
	}

	controller.createUser(req.body)
	.then(data =>{
		res.json({
			confirmation:'success',
			data:data
		})
	})
	.catch(err =>{
		res.json({
			confirmation:'fail',
			message:err.message
		})
	})

})


router.get('/review/u/:uid',(req, res)=>{
	const controller = controllers.review

	const uid = req.params.uid

	if(controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid Resource'
		})

		return
	}

	controller.getByUid(uid)
			  .then(data =>{
				res.json({
					confirmation:'success',
					data:data
				})
			  })
			  .catch(err =>{
				res.json({
					confirmation:'fail',
					message:err.message
				})
			})
})

router.get('/review/m/:mid',(req, res)=>{
	const controller = controllers.review

	const mid = req.params.mid

	if(controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid Resource'
		})

		return
	}

	controller.getByMovieId(mid)
			  .then(data =>{
				res.json({
					confirmation:'success',
					data:data
				})
			  })
			  .catch(err =>{
				res.json({
					confirmation:'fail',
					message:err.message
				})
			})
})

router.post('/review/create', (req, res)=>{
	const controller = controllers.review

	if(controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid Resource'
		})

		return
	}

	controller.post(req.body)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: data
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})











module.exports = router
