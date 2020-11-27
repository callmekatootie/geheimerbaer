$.when(document).then(()=>{
  function encode (encodeBase64, success) {
    $('#outputImg').attr('src', '/images/spinner-icon-gif-24.gif')
    $('#encodeBase64').val(encodeBase64?'true':'false')
    $('#errMsg').text('')
    const form = $('#encodingForm')[0]

    const data = new FormData(form)
    $.ajax({
      type: 'POST',
      enctype: 'multipart/form-data',
      contentType: false,
      cache: false,
      processData: false,
      url: $('#encodingForm').attr('action'),
      data: data,
      success: success,
      error: (err) => {
        $('#outputImg').attr('src', '')
        console.log('all is lost')
        console.log(err)
        $('#errMsg').text(err.responseJSON.err)
      },
      complete: (data) => {
        console.log('done')
      }
    })
  }

  function decode (success) {
    $('#errMsg').text('')
    const form = $('#decodingForm')[0]

    const data = new FormData(form)
    $.ajax({
      type: 'POST',
      enctype: 'multipart/form-data',
      contentType: false,
      cache: false,
      processData: false,
      url: $('#decodingForm').attr('action'),
      data: data,
      success: success,
      error: (err) => {
        $('#msg').attr('src', '')
        console.log('all is lost')
        console.log(err)
        $('#errMsg').text(err.responseJSON.err)
      },
      complete: (data) => {
        console.log('done', data)
      }
    })
  }

  $('#generateKey').on('click', (event) => {
    $.getJSON( '/api/random-key', (data) => {
      console.log(data)
      $('#key').val(data.randomKey)
    })
    return false
  })

  $('#generateNonce').on('click', (event) => {
    $.getJSON('/api/nonce', (data) => {
      console.log(data)
      $('#nonce').val(data.nonce)
    })
    return false
  })

  $('#decodingForm').on('submit', (event) => {
    event.preventDefault()
    $('#msg').val('')

    decode((data) => {
      console.log('great success', data)
      $('#msg').val(data.message)
    })

    return false
  })

  $('#encodingForm').on('submit', (event) => {
    event.preventDefault()
    encode(true, (data) => {
      console.log('great success')
      $('#outputImg').attr('src', 'data:image/png;base64, ' + data)
      $('#download').show()
    })

    return false
  })

  $('#generateKeys').on('click', (event) => {
    $.getJSON('/api/keypair', (data) => {
      console.log(data)
      $('#pubKey').val(data.publicKey)
      $('#priKey').val(data.privateKey)
    })
    return false
  })
})
