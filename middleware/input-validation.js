const { body, validationResult } = require('express-validator')

// 設定每個欄位的驗證條件
const fieldValidator = {
  name: body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('name, initialAmount and type are required.'),
  initialAmount: body('initialAmount')
    .trim()
    .not()
    .isEmpty()
    .withMessage('name, initialAmount and type are required.')
    .bail()
    .isInt()
    .withMessage('initialAmount should be number'),
  type: body('type')
    .trim()
    .not()
    .isEmpty()
    .withMessage('name, initialAmount and type are required.'),
}

// 新增帳戶的表單驗證欄位
const accountValidations = [
  fieldValidator.name,
  fieldValidator.initialAmount,
  fieldValidator.type,
]

module.exports = {
  // 新增帳戶的表單驗證middleware
  addAccountValidator: async (req, res, next) => {
    try {
      // 平行驗證(同時驗證所有欄位)
      await Promise.all(
        accountValidations.map(addNewAccountField =>
          addNewAccountField.run(req)
        )
      ) // run每個field的validation chain，chain is serial

      // 取得驗證結果，如果結果有錯，回傳錯誤訊息給前端
      if (!validationResult(req).isEmpty()) {
        const validationErrorMsgs = validationResult(req)
          .array()
          .map(err => err.msg) // 提取錯誤訊息
        // 判別錯誤訊息，response with different status code
        if (
          validationErrorMsgs.includes(
            'name, initialAmount and type are required.'
          )
        )
          return res.status(400).json({
            status: 'error',
            message: 'name, initialAmount and type are required.',
          })
        if (validationErrorMsgs.includes('initialAmount should be number')) {
          return res.status(422).json({
            status: 'error',
            message: 'initialAmount should be number',
          })
        }
      }
      
      // 通過驗證，req傳至下一層middleware
      return next()
    } catch (error) {
      next(error)
    }
  },
}
