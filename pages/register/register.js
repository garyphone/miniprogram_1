// pages/register/register.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        text: "Get Verification Code",
        currentTime: 11,
        disabled: false,
        phone: "",
        VerificationCode: "",
        Code: "",
        NewChanges: "",
        NewChangesAgain: "",
        success: false,
        state: "",
    },

    return_home: function (e) {
        wx.navigateTo({
          url: '/pages/index/index',
        })
    },

    handleInputPhone: function (e) {
        this.setData({
            phone: e.detail.value
        })
    },

    handleVerficationCode: function (e) {
        console.log(e);
        this.setData({
            Code: e.detail.value
        })
    },

    handleNewChanges: function (e) {
        console.log(e);
        this.setData({
            NewChanges: e.detail.value
        })
    },

    handleNewChangesAgain: function (e) {
        console.log(e);
        this.setData({
            NewChangesAgain: e.detail.value
        })
    },

    doGetCode: function() {
        var that = this;
        that.setData({
            disabled: true,
            color: "#ccc",
        })

        var phone = that.data.phone;
        var currentTime = that.data.currentTime;
        var warn = null;
        wx.request({
            url: "",
            method: "GET",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
                that.setData({
                    state: res.data
                })
                if (phone = "") {
                    warn = "Phone number should not be empty";
                } else if (phone.trim().length !=11) {
                    warn = "invalid phone number";
                } else if (that.data.state == 1) {
                    warn = "this phone number has been registered"
                } else {
                    wx.request({
                      url: '',
                      method: "POST",
                      data: {
                          coachid: that.data.phone
                      },
                      header: {
                        "content-type": "application/x-www-form-urlencoded"
                      },
                      success: function (res) {
                          console.log(res.data)
                          that.setData({
                              VerificationCode: res.data.verifycode
                          })
                          wx.showToast({
                            title: 'SMS has been sent',
                            icon: 'none',
                            duration: 2000
                          });
                          var interval = setInterval(function () {
                              currentTime--;
                              that.setData({
                                  text: currentTime + 's',
                              })
                              if (currentTime <= 0) {
                                  clearInterval(interval)
                                  that.setData({
                                      text: 'Send again',
                                      currentTime: 11,
                                      disabled: false,
                                      color: '#33ff99'
                                  })
                              }
                          }, 100)
                      }
                    })
                };
                if (ware != null) {
                    wx.showModal({
                      title: 'Warning',
                      content: warn
                    })
                    that.setData({
                        disabled: false,
                        color: '#33ff99'
                    })
                    return;
                }
            }
        })
    },

    submit: function (e) {
        var that = this
        if (this.data.Code = '') {
            wx.showToast({
              title: 'Please enter verification code',
              duration: 2000
            })
            return
        } else if (this. data.Code != this.data.VerificationCode) {
            wx.showToast({
              title: 'Verification Code is invalid',
              duration: 2000
            })
            return
        } else if (this.data.NewChanges == '') {
            wx.showToast({
              title: 'Please enter the password',
              duration: 2000
            })
            return
        } else if (this.data.NewChangesAgain != this.data.NewChanges) {
            wx.showToast({
              title: 'Wrong duplicated password',
              duration: 2000
            })
            return
        } else {
            var that = this
            var phone = that.data.phone;
            wx.request({
              url: getApp().globalData.baseUrl + '/Coachs/insert',
              method: "POST",
              data: {
                  coachid: phone,
                  coachpassword: that.data.NewChanges
              },
              header: {
                  "content-type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                  wx.showToast({
                    title: 'Successful',
                    icon: 'loading',
                    duration: 2000
                  })
                  console.log(res)
                  that.setData({
                      success: true
                  })
              }
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})