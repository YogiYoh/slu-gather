import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

function Footer() {
  return <MDBox width="100%" />;
}

// Empty defaults just to satisfy any usage elsewhere
Footer.defaultProps = {
  company: { href: "", name: "" },
  links: [],
};

Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
