import { Box, Flex, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';


function Dislaimer() {
  return (
    
  
    <Layout>
      <Head>
        <title>Disclaimer - UnGames</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box bgColor="#242424">
        <Box
          bgImage="/assets/bg-landing.png"
          bgSize="30%"
          bgPosition="bottom right"
          bgRepeat="no-repeat"
          backgroundAttachment="fixed"
        >
          <VStack
            justifyContent="center"
            alignItems="center"
            p="100px 0 50px 0"
            gap="50px"
          >
            <Flex
              bgColor="rgba(85, 85, 85, 0.5)"
              justifyContent="center"
              w={['90%', '90%', '90%', '70%']}
              position="relative"
              padding={['40px', '80px']}
              borderRadius="40px"
            >
              <Box color="white" textAlign="justify">
                <Heading
                  mb="40px"
                  as="h1"
                  fontSize={['3xl', '5xl']}
                  color="white"
                >
                  Disclaimer for Undefined Team
                </Heading>

                <p>
                  {`  If you require any more information or have any questions
                  about our site's disclaimer, please feel free to contact us by
                  email at undefined@undefined.co. Our Disclaimer was generated
                  with the help of the `}
                  <a href="https://www.disclaimergenerator.net/">
                    Free Disclaimer Generator
                  </a>
                  .
                </p>
                <br />
                <h2>Disclaimers for Undefined Team</h2>
                <br />
                <p>
                  All the information on this website - undefined.co - is
                  published in good faith and for general information purpose
                  only. Undefined Team does not make any warranties about the
                  completeness, reliability and accuracy of this information.
                  Any action you take upon the information you find on this
                  website (Undefined Team), is strictly at your own risk.
                  Undefined Team will not be liable for any losses and/or
                  damages in connection with the use of our website.
                </p>
                <br />
                <p>
                  {` From our website, you can visit other websites by following
                  hyperlinks to such external sites. While we strive to provide
                  only quality links to useful and ethical websites, we have no
                  control over the content and nature of these sites. These
                  links to other websites do not imply a recommendation for all
                  the content found on these sites. Site owners and content may
                  change without notice and may occur before we have the
                  opportunity to remove a link which may have gone 'bad'.`}
                </p>
                <br />
                <p>
                  {`  Please be also aware that when you leave our website, other
                  sites may have different privacy policies and terms which are
                  beyond our control. Please be sure to check the Privacy
                  Policies of these sites as well as their "Terms of Service"
                  before engaging in any business or uploading any information.`}
                </p>
                <br />
                <h2>Consent</h2>
                <br />
                <p>
                  By using our website, you hereby consent to our disclaimer and
                  agree to its terms.
                </p>
                <br />
                <h2>Update</h2>
                <br />
                <p>
                  Should we update, amend or make any changes to this document,
                  those changes will be prominently posted here.
                </p>
              </Box>
            </Flex>
          </VStack>
        </Box>
      </Box>
    </Layout>
    
  );
}

export default Dislaimer;
