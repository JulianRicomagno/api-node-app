const { Router } = require('express');
const router = Router();
const { UserTourist } = require('../../controllers');

router.post('/create', UserTourist.create);
router.get('/fetchall', UserTourist.fetchAll);
router.delete('/delete', UserTourist.deleteUser);
router.post('/update', UserTourist.update);
router.post('/updateitinerary', UserTourist.updateItinerary);

module.exports = router;
