export interface HalLink {
  href: string;
  type?: string;
  templated?: boolean;
  title?: string;
}

export interface HalResource {
  _links?: {
    [rel: string]: HalLink;
  };
}
