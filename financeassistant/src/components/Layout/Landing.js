import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <div className="light-overlay landing-inner text-dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4" style={{color : '#3035ff'}}>
                                  FINANCE ASSISTANT MANAGER
                                </h1>
                                <p className="lead" style={{color : '#b635ff'}}>
                                    <b>Create your account to join in</b>
                                </p>
                                <hr />
                                <Link className="btn btn-lg btn-primary mr-2" to="/register">
                                    Sign Up
                                </Link>
                                <Link className="btn btn-lg btn-secondary mr-2" to="/login">
                                    Login
                                </Link>
                            </div>
                            <div>
                                <div style={{fontSize: '21px', color : '#f7ffff', backgroundColor: 'rgba(244, 0, 0, 0.3)'}}>
                                    <b>
                                    Hello FAM Users. This is web app to help you with your finance, to be your Finance Assistant Manager. If you want to use our services you need to have an account
                                    or if you already have just login in. SAVEMONEY is dashboard where you can see your last transactions. In task View Profile you can change something from your profile or just to check what you have.
                                    Accounts offers you to see your accounts or add new Account CARD(Credit Card or Cash). Any transaction you make, whether it's spending or adding money to your account, you can make in the Transactions tab.
                                    If make some mistakes in Transactions or Accounts you can edit or delete it. Saving is something that everyone needs. We want to save money and that will help you with that. Hope savings is the amount of money
                                    you want to save. InitialBalance will change if you make some Transactions. The goal is InitialBalance to be like hope savings. You can delete or edit just if you are admin on that work. This tab will help you if you need to find job.
                                    </b>
                                    <p>
                                        <b>WE HOPE YOU WILL ENJOY IN THIS FAM APP.</b>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;