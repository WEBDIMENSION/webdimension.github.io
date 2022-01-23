// import * as React from "react"
import { useLocation } from "@reach/router"
import React from "react"
import Grid from "@material-ui/core/Grid";
import Header from "./header"
import Footer from "./footer"
import Bio from "../components/bio"
import Tags from "../components/tags"
import Mode from "../components/mode"
// import {PageProps} from "gatsby";

// const Layout = ({location, children) => {
const Layout = ({children}: { children?: React.ReactNode }) => {
// const Layout: React.FC<PageProps> = ({ location },{ children }: { children?: React.ReactNode }) => {

    const location = useLocation();
    const rootPath = `/`
    const isRootPath = location?.pathname === rootPath

    return (

        <div data-is-root-path={isRootPath}
             style={{
                 backgroundColor: 'var(--bg)',
                 color: 'var(--textNormal)',
                 transition: 'color 0.2s ease-out, background 0.2s ease-out',
             }}
        >
            <Grid container>
                <Grid item xs={12}>
                    <Header/>
                    <main className="container">
                        <Grid container>
                            <Grid item xs={12} sm={3} >
                                {/*<Mode/>*/}
                                <Bio/>
                                <Tags/>
                            </Grid>
                            <Grid item xs={12} sm={9}> {children}</Grid>
                        </Grid>
                    </main>
                </Grid>
                <Footer/>
            </Grid>
        </div>
    )
}
export default Layout