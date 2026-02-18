import React from 'react';
import './PageHeader.css';

/**
 * PageHeader - Reusable page header/banner with gradient background
 */
const PageHeader = ({ title, subtitle, breadcrumb }) => {
    return (
        <section className="page-header">
            <div className="page-header-bg">
                <div className="page-header-pattern"></div>
                <div className="page-header-overlay"></div>
            </div>
            <div className="container page-header-content">
                {breadcrumb && (
                    <div className="page-breadcrumb animate-fadeInDown">
                        {breadcrumb.map((item, i) => (
                            <span key={i}>
                                {i > 0 && <span className="breadcrumb-separator">/</span>}
                                {item.link ? (
                                    <a href={item.link} className="breadcrumb-link">{item.label}</a>
                                ) : (
                                    <span className="breadcrumb-current">{item.label}</span>
                                )}
                            </span>
                        ))}
                    </div>
                )}
                <h1 className="page-header-title animate-fadeInUp">{title}</h1>
                {subtitle && <p className="page-header-subtitle animate-fadeInUp delay-2">{subtitle}</p>}
            </div>
        </section>
    );
};

export default PageHeader;
