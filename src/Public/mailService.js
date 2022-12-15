module.exports.forgotPassMailTemplate = (email, newPassword) => {
    const data = {
        from: 'htk02102002@gmai.com',
        to: email,
        subject: 'Thay đổi mật khẩu',
        html:
            (`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                
            </head>
            <body>
                <div class="container" style="width: 50%;height: 100%;margin: 0 auto;box-shadow: 3px 3px 3px black;">
                    <div class="content">
                        <div class="title">
                            <h3 class="title-header" style="text-align: center;font-size: 26px;">Thay đổi mật khẩu</h3>
                        </div>
                        <div class="description" style="margin: -10px 0 0 30px;">
                            <p>Thay đổi mật khẩu thành công.</p>
                            <p>Mật khẩu mới của bạn: ${newPassword}</p>
                        </div>
                    </div>
            
                </div>
            </body>
            </html>
        `)
    };

    return { data };
}