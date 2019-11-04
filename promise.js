
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(func){

	this.state = PENDING
	this.value = undefined
	this.reason = undefined

	this.fulfilledCallbacks = []
	this.rejectedCallbacks = []


	const resolve = (value) => {
		if(this.state === PENDING) {
			this.state = FULFILLED
			this.value = value
			this.fulfilledCallbacks.forEach(fn => {
				fn()
			})
		}
	}

	const reject = (reason) => {
		if(this.state === PENDING) {
			this.state === REJECTED
			this.reason = reason
			this.rejectedCallbacks.forEach(fn => {
				fn()
			})
		}
	}

	func(resolve, reject);
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
	if (this.state === PENDING) {
		this.fulfilledCallbacks.push(() => {
			onFulfilled(this.value)
		})
		this.rejectedCallbacks.push(() => {
			onRejected(this.reason)
		})
	}
	if (this.state === FULFILLED) {
		onFulfilled(this.value)
	}
	if (this.state === REJECTED) {
		onRejected(this.reason)
	}
}


const p = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		resolve('111')
	}, 1000)
})


p.then(val => {
	console.log(val)
})